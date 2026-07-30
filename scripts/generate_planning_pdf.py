"""Generate the submission-ready project plan for the DAKER hackathon.

The document describes only behaviour implemented in the current MVP. Dataset
counts and provenance are read from the checked-in JSON snapshot, preventing
the proposal and the app from drifting apart.
"""

from __future__ import annotations

import json
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Flowable,
    Frame,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / "data" / "world-cup-2026.json"
OUTPUT = ROOT / "output" / "pdf" / "TACTICA-2026-차라리-내가-감독함-기획서.pdf"
FONT_REGULAR = Path(r"C:\Windows\Fonts\malgun.ttf")
FONT_BOLD = Path(r"C:\Windows\Fonts\malgunbd.ttf")

NAVY = colors.HexColor("#091424")
NAVY_2 = colors.HexColor("#10243D")
INK = colors.HexColor("#142B45")
MUTED = colors.HexColor("#526A82")
MINT = colors.HexColor("#59E6BD")
ICE = colors.HexColor("#F4F8FC")
LINE = colors.HexColor("#C7D5E1")
AMBER = colors.HexColor("#F6B84B")


def register_fonts() -> None:
    pdfmetrics.registerFont(TTFont("Malgun", str(FONT_REGULAR)))
    pdfmetrics.registerFont(TTFont("MalgunBold", str(FONT_BOLD)))


def get_styles() -> dict[str, ParagraphStyle]:
    base = getSampleStyleSheet()
    return {
        "cover_kicker": ParagraphStyle(
            "CoverKicker", parent=base["BodyText"], fontName="MalgunBold",
            fontSize=9.5, leading=14, textColor=MINT, alignment=TA_CENTER, spaceAfter=8,
        ),
        "cover_title": ParagraphStyle(
            "CoverTitle", parent=base["Title"], fontName="MalgunBold",
            fontSize=29, leading=38, textColor=colors.white, alignment=TA_CENTER, spaceAfter=8,
        ),
        "cover_subtitle": ParagraphStyle(
            "CoverSubtitle", parent=base["BodyText"], fontName="Malgun",
            fontSize=12, leading=19, textColor=colors.HexColor("#BDD0E4"), alignment=TA_CENTER,
        ),
        "cover_body": ParagraphStyle(
            "CoverBody", parent=base["BodyText"], fontName="Malgun",
            fontSize=10.5, leading=18, textColor=colors.HexColor("#D8E6F4"), alignment=TA_CENTER,
        ),
        "h1": ParagraphStyle(
            "H1", parent=base["Heading1"], fontName="MalgunBold",
            fontSize=17, leading=25, textColor=INK, spaceBefore=2, spaceAfter=9,
        ),
        "h2": ParagraphStyle(
            "H2", parent=base["Heading2"], fontName="MalgunBold",
            fontSize=11.3, leading=17, textColor=NAVY_2, spaceBefore=9, spaceAfter=5,
        ),
        "body": ParagraphStyle(
            "Body", parent=base["BodyText"], fontName="Malgun",
            fontSize=9.3, leading=15.2, textColor=INK, spaceAfter=7,
        ),
        "small": ParagraphStyle(
            "Small", parent=base["BodyText"], fontName="Malgun",
            fontSize=7.5, leading=11, textColor=MUTED,
        ),
        "table": ParagraphStyle(
            "Table", parent=base["BodyText"], fontName="Malgun",
            fontSize=8.1, leading=12.1, textColor=INK,
        ),
        "table_bold": ParagraphStyle(
            "TableBold", parent=base["BodyText"], fontName="MalgunBold",
            fontSize=8.1, leading=12.1, textColor=NAVY,
        ),
        "metric": ParagraphStyle(
            "Metric", parent=base["BodyText"], fontName="MalgunBold",
            fontSize=15, leading=18, textColor=NAVY, alignment=TA_CENTER,
        ),
        "metric_label": ParagraphStyle(
            "MetricLabel", parent=base["BodyText"], fontName="Malgun",
            fontSize=7.2, leading=10, textColor=MUTED, alignment=TA_CENTER,
        ),
        "callout_title": ParagraphStyle(
            "CalloutTitle", parent=base["BodyText"], fontName="MalgunBold",
            fontSize=9.3, leading=13, textColor=NAVY,
        ),
        "callout_body": ParagraphStyle(
            "CalloutBody", parent=base["BodyText"], fontName="Malgun",
            fontSize=8.2, leading=12.1, textColor=INK,
        ),
        "inverse_label": ParagraphStyle(
            "InverseLabel", parent=base["BodyText"], fontName="MalgunBold",
            fontSize=7.4, leading=10, textColor=MINT, alignment=TA_CENTER,
        ),
        "inverse_value": ParagraphStyle(
            "InverseValue", parent=base["BodyText"], fontName="MalgunBold",
            fontSize=12, leading=16, textColor=colors.white, alignment=TA_CENTER,
        ),
    }


def para(text: str, style: ParagraphStyle) -> Paragraph:
    return Paragraph(text, style)


def section_title(number: str, title: str, styles: dict[str, ParagraphStyle]) -> Paragraph:
    return para(f"{number}. {title}", styles["h1"])


def info_table(rows: list[list[str]], widths: list[float], styles: dict[str, ParagraphStyle], header: bool = True) -> Table:
    material = []
    for row_index, row in enumerate(rows):
        material.append([
            para(value, styles["table_bold"] if header and row_index == 0 else styles["table"])
            for value in row
        ])
    table = Table(material, colWidths=widths, repeatRows=1 if header else 0, hAlign="LEFT")
    table_style = [
        ("GRID", (0, 0), (-1, -1), 0.35, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 7),
        ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]
    if header:
        table_style.extend([
            ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#DDF7EF")),
            ("LINEBELOW", (0, 0), (-1, 0), 0.7, colors.HexColor("#8CDCC6")),
        ])
    table.setStyle(TableStyle(table_style))
    return table


def metric_card(value: str, label: str, styles: dict[str, ParagraphStyle]) -> Table:
    table = Table(
        [[para(value, styles["metric"])], [para(label, styles["metric_label"])]],
        colWidths=[36 * mm], rowHeights=[9 * mm, 7 * mm],
    )
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), ICE),
        ("BOX", (0, 0), (-1, -1), 0.6, LINE),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 2),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
    ]))
    return table


def callout(title: str, body: str, styles: dict[str, ParagraphStyle], accent: colors.Color = MINT) -> Table:
    table = Table(
        [[para(title, styles["callout_title"])], [para(body, styles["callout_body"])]],
        colWidths=[156 * mm],
    )
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#F0FAF7")),
        ("LINEBEFORE", (0, 0), (0, -1), 3, accent),
        ("BOX", (0, 0), (-1, -1), 0.45, colors.HexColor("#BDEBDC")),
        ("LEFTPADDING", (0, 0), (-1, -1), 11),
        ("RIGHTPADDING", (0, 0), (-1, -1), 10),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
    ]))
    return table


class PitchDiagram(Flowable):
    """Vector tactical board illustration, so no external image asset is needed."""

    def __init__(self, width: float = 156 * mm, height: float = 72 * mm):
        super().__init__()
        self.width = width
        self.height = height

    def draw(self) -> None:
        canvas = self.canv
        width, height = self.width, self.height
        canvas.saveState()
        canvas.setFillColor(colors.HexColor("#146642"))
        canvas.roundRect(0, 0, width, height, 4 * mm, fill=1, stroke=0)
        canvas.setFillColor(colors.HexColor("#1B744B"))
        for index in range(7):
            if index % 2 == 0:
                canvas.rect(index * width / 7, 0, width / 7, height, fill=1, stroke=0)
        canvas.setStrokeColor(colors.HexColor("#83C4A5"))
        canvas.setLineWidth(0.55)
        canvas.rect(4 * mm, 4 * mm, width - 8 * mm, height - 8 * mm, fill=0, stroke=1)
        canvas.line(width / 2, 4 * mm, width / 2, height - 4 * mm)
        canvas.circle(width / 2, height / 2, 9 * mm, fill=0, stroke=1)
        canvas.circle(width / 2, height / 2, 0.8 * mm, fill=1, stroke=0)
        canvas.rect(4 * mm, height / 2 - 18 * mm, 17 * mm, 36 * mm, fill=0, stroke=1)
        canvas.rect(width - 21 * mm, height / 2 - 18 * mm, 17 * mm, 36 * mm, fill=0, stroke=1)
        canvas.setFont("MalgunBold", 7)
        positions = [
            (20, 36, "GK"), (41, 16, "LB"), (41, 30, "LCB"), (41, 42, "RCB"), (41, 56, "RB"),
            (73, 24, "LCM"), (73, 36, "CDM"), (73, 48, "RCM"), (106, 18, "LW"),
            (111, 36, "ST"), (106, 54, "RW"),
        ]
        for x_ratio, y_ratio, label in positions:
            x = width * x_ratio / 128
            y = height * y_ratio / 72
            canvas.setFillColor(NAVY_2)
            canvas.setStrokeColor(MINT)
            canvas.roundRect(x - 8 * mm, y - 4.4 * mm, 16 * mm, 8.8 * mm, 2.1 * mm, fill=1, stroke=1)
            canvas.setFillColor(colors.white)
            canvas.drawCentredString(x, y - 1.1 * mm, label)
        canvas.setFillColor(colors.white)
        canvas.setFont("MalgunBold", 8)
        canvas.drawString(7 * mm, height - 8 * mm, "DRAG, DROP, DECIDE")
        canvas.setFont("Malgun", 6.5)
        canvas.setFillColor(colors.HexColor("#D8F9E9"))
        canvas.drawRightString(width - 7 * mm, height - 8 * mm, "FIFA STYLE POSITION MAP")
        canvas.restoreState()


class FlowRail(Flowable):
    def __init__(self, labels: list[str], width: float = 156 * mm, height: float = 26 * mm):
        super().__init__()
        self.labels = labels
        self.width = width
        self.height = height

    def draw(self) -> None:
        canvas = self.canv
        canvas.saveState()
        count = len(self.labels)
        step = self.width / count
        y = self.height / 2
        canvas.setStrokeColor(colors.HexColor("#9CDDCB"))
        canvas.setLineWidth(1.5)
        canvas.line(step / 2, y, self.width - step / 2, y)
        for index, label in enumerate(self.labels):
            x = step * (index + 0.5)
            canvas.setFillColor(MINT if index < count - 1 else AMBER)
            canvas.circle(x, y, 5 * mm, fill=1, stroke=0)
            canvas.setFillColor(NAVY)
            canvas.setFont("MalgunBold", 8)
            canvas.drawCentredString(x, y - 1.05 * mm, str(index + 1))
            canvas.setFillColor(INK)
            canvas.setFont("MalgunBold", 7.5)
            canvas.drawCentredString(x, 2.5 * mm, label)
        canvas.restoreState()


def header_footer(canvas, doc) -> None:
    canvas.saveState()
    page = canvas.getPageNumber()
    if page != 1:
        canvas.setFillColor(NAVY)
        canvas.rect(0, A4[1] - 11 * mm, A4[0], 11 * mm, fill=1, stroke=0)
        canvas.setFont("MalgunBold", 7.7)
        canvas.setFillColor(MINT)
        canvas.drawString(18 * mm, A4[1] - 7.2 * mm, "TACTICA 2026")
        canvas.setFont("Malgun", 7.2)
        canvas.setFillColor(colors.HexColor("#C9D9E9"))
        canvas.drawRightString(192 * mm, A4[1] - 7.2 * mm, "차라리 내가 감독함 | 프로젝트 기획서")
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.35)
    canvas.line(18 * mm, 15 * mm, 192 * mm, 15 * mm)
    canvas.setFont("Malgun", 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(18 * mm, 9.3 * mm, "TACTICA 2026 | DAKER 월간 해커톤 제출용")
    canvas.drawRightString(192 * mm, 9.3 * mm, str(page))
    canvas.restoreState()


def load_summary() -> dict[str, str | int]:
    dataset = json.loads(DATA_PATH.read_text(encoding="utf-8"))
    metadata = dataset["metadata"]
    return {
        "team_count": len(dataset["teams"]),
        "player_count": len(dataset["players"]),
        "formation_count": len(dataset["formations"]),
        "source_name": metadata["sourceName"],
        "license": metadata["license"],
        "updated": metadata["lastUpdated"],
        "selection_rule": metadata["selectionRule"],
    }


def build() -> None:
    register_fonts()
    summary = load_summary()
    styles = get_styles()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)

    doc = BaseDocTemplate(
        str(OUTPUT), pagesize=A4, leftMargin=18 * mm, rightMargin=18 * mm,
        topMargin=18 * mm, bottomMargin=21 * mm,
        title="TACTICA 2026: 차라리 내가 감독함 - 프로젝트 기획서",
        author="TACTICA 2026", subject="DAKER 월간 해커톤 기획서",
    )
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main")
    doc.addPageTemplates([PageTemplate(id="main", frames=[frame], onPage=header_footer)])

    s = styles
    story: list[Flowable] = []

    cover = Table([
        [Spacer(1, 13 * mm)],
        [para("DAKER MONTHLY HACKATHON | PROJECT PLAN", s["cover_kicker"])],
        [para("TACTICA 2026", s["cover_title"])],
        [para("차라리 내가 감독함", s["cover_title"])],
        [para("데이터로 증명하는 나만의<br/>월드컵 전술 시뮬레이터", s["cover_subtitle"])],
        [Spacer(1, 10 * mm)],
        [para("상대를 읽고, XI를 다시 짜고, 90분 동안 직접 대응한다.<br/>‘차라리 내가 감독하면 이렇게 한다’를 데이터와 결과로 증명한다.", s["cover_body"])],
        [Spacer(1, 12 * mm)],
        [Table([
            [para("프로젝트 목적", s["inverse_label"]), para("핵심 가치", s["inverse_label"]), para("서비스 형태", s["inverse_label"])],
            [para("감독 의사결정의 체험화", s["inverse_value"]), para("조작 가능한 전술과 설명 가능한 결과", s["inverse_value"]), para("설치 없이 실행되는 웹서비스", s["inverse_value"])],
        ], colWidths=[43.3 * mm, 43.3 * mm, 43.3 * mm], rowHeights=[7 * mm, 17 * mm], style=TableStyle([
            ("GRID", (0, 0), (-1, -1), 0.45, colors.HexColor("#35516F")),
            ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#10243D")),
            ("BACKGROUND", (0, 1), (-1, 1), colors.HexColor("#0B1B30")),
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ("LEFTPADDING", (0, 0), (-1, -1), 5),
            ("RIGHTPADDING", (0, 0), (-1, -1), 5),
            ("TOPPADDING", (0, 0), (-1, -1), 3),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
        ]))],
        [Spacer(1, 13 * mm)],
        [para("2026. 07 | 개인 참가 | 기획서 제출본", s["cover_subtitle"])],
        [Spacer(1, 8 * mm)],
    ], colWidths=[156 * mm])
    cover.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), NAVY),
        ("BOX", (0, 0), (-1, -1), 0.8, colors.HexColor("#214261")),
        ("LEFTPADDING", (0, 0), (-1, -1), 13 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 13 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    story.extend([Spacer(1, 28 * mm), cover, PageBreak()])

    story.append(section_title("1", "서비스 개요", s))
    story.append(para(
        "TACTICA 2026: 차라리 내가 감독함은 사용자가 축구 감독이 되어 실제 월드컵 데이터 기반의 국가 대표팀을 고르고, "
        "선발과 전술을 직접 구성한 뒤, 경기 중 변화까지 반영된 결과를 확인하는 동적 인터랙션 웹서비스다. "
        "단순 포메이션 선택기가 아니라 <b>선택 - 재생 - 개입 - 해석</b>의 루프를 완성해 ‘차라리 내가 감독하면 이렇게 한다’는 팬의 직관을 실제 조작 경험으로 바꾼다.",
        s["body"],
    ))
    story.append(Spacer(1, 2 * mm))
    story.append(Table([[
        metric_card(str(summary["team_count"]), "선택 가능한 국가 대표팀", s),
        metric_card(f"{summary['player_count']:,}", "전술 보드용 선수 데이터", s),
        metric_card(str(summary["formation_count"]), "FIFA 스타일 포메이션", s),
        metric_card("90분", "경기 흐름과 개입 구간", s),
    ]], colWidths=[39 * mm, 39 * mm, 39 * mm, 39 * mm], style=TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ])))
    story.append(section_title("2", "문제 정의와 차별점", s))
    story.append(info_table([
        ["일반적인 전술 콘텐츠", "TACTICA 2026의 해결 방식"],
        ["해설을 읽고 끝나는 수동적 소비", "선수 카드와 경기장을 직접 조작하는 능동적 감독 경험"],
        ["결과만 보여 주어 이유를 알기 어려움", "포지션 적합도, 전술 상성, 체력, 의사결정 로그로 결과를 설명"],
        ["경기 전 전술만 설정", "하프타임과 경기 중 교체·전술 변경을 다음 구간 계산에 반영"],
        ["고정된 매치업", "32개국에서 홈·원정 국가를 직접 골라 여러 가설을 실험"],
    ], [53 * mm, 103 * mm], s))
    story.append(Spacer(1, 3 * mm))
    story.append(callout(
        "핵심 차별점 - 스포일러 없는 감독 의사결정",
        "시뮬레이션 시작 직후 최종 리포트를 노출하지 않는다. 사용자는 경기 흐름을 보고 하프타임에 '흐름 잠금·균형 회복·승부수' 중 하나를 선택하거나 교체와 전술 변경을 직접 수행한다. 풀타임 뒤에만 결과 분석과 선택의 영향을 공개한다.",
        s,
    ))
    story.append(PageBreak())

    story.append(section_title("3", "감독 경험 설계 의도", s))
    story.append(para(
        "서비스의 중심은 AI가 답을 대신 내리는 경험이 아니라, 사용자가 결정의 주체가 되는 경험이다. "
        "전술 어시스턴트는 상대 패턴과 현재 배치를 근거로 제안하지만, 사용자는 제안을 채택하거나 자신만의 전술을 선택할 수 있다. "
        "각 결과에는 재현 가능한 규칙 흔적을 남겨 사용자가 전술의 인과관계를 이해하도록 한다.", s["body"]))
    story.append(FlowRail(["상대 읽기", "스쿼드 설계", "경기 개입", "결과 해석"]))
    story.append(Spacer(1, 3 * mm))
    story.append(section_title("4", "페이지 구성", s))
    story.append(info_table([
        ["영역", "페이지 구성과 역할"],
        ["매치업 선택", "32개국 중 홈·상대 국가를 고르고 FIFA 랭킹, 팀 성향, 상대 위험 요약을 확인"],
        ["왼쪽 스쿼드", "선발/후보 탭, 공격·중원·수비·골키퍼 분류, 선수 스카우트 카드와 세부 능력치"],
        ["중앙 전술 보드", "자유 드래그앤드롭, 포지션 드롭 맵, 자동 포메이션 재인식, 포지션 적합도와 역할별 종합 평점"],
        ["오른쪽 3개 탭", "LIVE 경기 재생, SCOUT 상대 분석, REPORT 결과 리포트를 경기 맥락에 맞춰 분리"],
        ["DATA · METHOD", "CC0 데이터 출처, 가공 범위, 계산 근거, 심사자 체험 순서를 공개"],
    ], [42 * mm, 114 * mm], s))
    story.append(Spacer(1, 4 * mm))
    story.append(PitchDiagram())
    story.append(Spacer(1, 3 * mm))
    story.append(para("그림은 전술 보드의 구조를 설명하기 위한 벡터 다이어그램이며, 별도 이미지 자산을 사용하지 않는다.", s["small"]))
    story.append(PageBreak())

    story.append(section_title("5", "핵심 인터랙션 명세", s))
    story.append(info_table([
        ["기능", "사용자 행동", "즉시 피드백과 결과"],
        ["자유 선수 배치", "선발·후보 탭에서 선수를 선택 또는 드래그해 경기장에 배치", "포지션별 핵심 스탯 평균, OVR, 체력, 포지션 적합도를 카드와 링 색으로 표시"],
        ["포메이션 자동 반영", "ST, LW, RW, CF, CAM, CM, CDM, LCM, RCM, CB, 윙백 등 위치 영역으로 이동", "가장 가까운 전술 형태를 인식해 포메이션과 역할 구성을 다시 계산"],
        ["상대 분석·전술 추천", "상대 팀의 패턴과 약점을 확인하고 제안 전술 적용 또는 수동 조정", "압박, 라인, 폭, 템포, 빌드업 5개 지시와 상성 설명을 함께 갱신"],
        ["라이브 시뮬레이션", "시뮬레이션 버튼을 누르고 90분 경기 흐름을 재생", "슈팅, 유효슈팅, 선방, 코너, 파울 등 이벤트가 타임라인과 경기장 모션으로 표현"],
        ["경기 중 의사결정", "하프타임 또는 정해진 경기 중 구간에 교체·전술 변경", "변경 전후 선발, 체력, 전술 지시를 다음 구간의 이벤트 확률과 지표에 반영"],
        ["풀타임 리포트", "재생 종료 후 REPORT 탭 열기", "스코어, xG, 핵심 지표, 전술 결과, 선택 영향, 규칙 흔적, A/B 플랜 비교"],
    ], [31 * mm, 56 * mm, 69 * mm], s))
    story.append(Spacer(1, 4 * mm))
    story.append(callout(
        "심사자가 3분 안에 확인할 수 있는 흐름",
        "국가 선택 → 선수 배치 또는 포메이션 선택 → 전술 1개 조정 → 라이브 경기 재생 → 하프타임 교체 또는 지시 → 풀타임 리포트 확인. 별도 설치, 회원가입, 유료 결제, 외부 API 키 입력 없이 브라우저에서 실행한다.",
        s,
        AMBER,
    ))
    story.append(PageBreak())

    story.append(section_title("6", "시뮬레이션과 결과 설명 로직", s))
    story.append(para(
        "TACTICA 엔진은 실제 경기 결과를 단정하거나 FIFA 공식 시뮬레이션이라고 주장하지 않는다. 실제 팀·선수·대회 기록을 입력으로 사용하되, "
        "사용자의 전술 선택이 어떤 방향으로 경기 흐름에 작용했는지 이해시키는 <b>규칙 기반·설명 가능한 전술 모델</b>이다.", s["body"]))
    story.append(info_table([
        ["계산 단계", "적용 내용", "사용자에게 보이는 근거"],
        ["1. 배치 평가", "선수의 세부 포지션과 역할별 핵심 스탯을 매칭", "포지션 적합도, 역할별 종합 평점"],
        ["2. 전술 상성", "압박·수비 라인·폭·템포·빌드업을 상대 성향과 비교", "공격·점유·수비 변화, 위험 요인, 추천 이유"],
        ["3. 구간별 경기", "15분 단위로 체력, 역할, 전술을 반영해 이벤트 확률 계산", "타임라인, 경기장 모션, 슈팅·선방·코너·파울 지표"],
        ["4. 개입 재계산", "하프타임과 경기 중 교체·전술 변경 이후 다음 구간을 재계산", "의사결정 로그와 선택 영향 카드"],
        ["5. 결과 해석", "xG, 점유, 수비 안정성, 체력, 상대 상성의 흔적을 요약", "풀타임 리포트와 A/B 전술 플랜 비교"],
    ], [31 * mm, 68 * mm, 57 * mm], s))
    story.append(section_title("7", "실제 월드컵 데이터 활용 방식", s))
    story.append(para(
        f"데이터 스냅샷은 {summary['source_name']}의 CC0 공개 데이터를 사용한다. "
        f"{summary['selection_rule']}에 따라 {summary['team_count']}개국과 {summary['player_count']:,}명의 선수를 전술 보드에 연결했고, "
        f"현재 스냅샷 갱신일은 {summary['updated']}이다.", s["body"]))
    story.append(info_table([
        ["원천 사실 데이터", "TACTICA 서비스 내 활용", "가공 원칙"],
        ["팀·선수 기본 정보, 원문 포지션, A매치·대표팀 득점, 시장가치", "국가 선택, 선수 카드, 기본 선발과 포지션 후보", "원문 포지션은 sourcePosition으로 보존하고 전술 보드용 세부 포지션은 별도 매핑"],
        ["대회 출전·선발·시간·득점·도움·선방", "선수 역할과 파생 능력치 지수의 입력", "OVR 및 7개 전술 스탯은 EA SPORTS FC/FIFA 공식 능력치가 아닌 규칙 기반 파생 지수"],
        ["팀 점유, 슈팅, 유효슈팅, 코너, 파울, 선방", "상대 분석, 팀 성향, 경기 결과 지표의 기준", "시뮬레이션 결과는 서비스 모델 값이며 실제 경기 예측·재현 결과가 아님"],
    ], [50 * mm, 54 * mm, 52 * mm], s))
    story.append(Spacer(1, 3 * mm))
    story.append(para(f"이용 조건: {summary['license']}", s["small"]))
    story.append(PageBreak())

    story.append(section_title("8", "고도화 완료 기능", s))
    story.append(para(
        "TACTICA 2026은 전술을 설정하고 결과를 보는 단계를 넘어, 경기 중 변화의 원인과 감독의 개입 효과를 추적하는 '전술 실험실'로 구성한다. "
        "아래 기능은 모두 제출본에서 직접 조작하고 확인할 수 있는 완성 기능이다.", s["body"]))
    story.append(info_table([
        ["고도화 기능", "동작 방식", "감독 경험의 가치"],
        ["TACTICAL PULSE", "15분 단위로 주도권, 역습 위험, 체력 부담, 핵심 지표의 변화를 한 화면에 표시하고 위험 구간을 강조", "점수만 보지 않고 언제 흐름이 바뀌었는지 읽는다."],
        ["OPPOSITION ADAPT", "스코어와 경기 양상에 따라 상대가 전환·압박·수비 블록 중 하나로 대응하고, 대응 시점·이유·취약 지점을 SCOUT 탭에 기록", "상대도 고정된 수치가 아닌 반응하는 팀으로 체감한다."],
        ["BENCH IMPACT LENS", "교체 OUT/IN을 고르면 공격·점유·수비·체력의 예상 변화와 포지션 적합도를 미리 비교하고, 재계산 뒤 실제 변화도 남김", "교체를 이름 교환이 아닌 전술 카드로 판단한다."],
        ["ROLE IMPACT MAP", "풀타임 리포트에서 역할 기여도 상위 선수, 기여 장면, 전술 적합도, 체력 상태를 함께 시각화", "누가 왜 경기 흐름을 만들었는지 선수 단위로 이해한다."],
        ["MISSION SCORE", "매치업 목표를 공격 실행·수비 대응·체력 관리·의사결정의 4개 항목으로 채점하고 다음 시도 과제를 제시", "승패 외에도 감독으로서의 전술 목표 달성도를 확인한다."],
        ["IF REPLAY", "하프타임 선택과 교체·전술 변경 전후를 기준 플랜과 비교해 xG, 지표, 위험도의 변화를 표시", "'그때 다른 선택을 했다면'을 근거와 함께 되짚는다."],
    ], [34 * mm, 70 * mm, 52 * mm], s))
    story.append(Spacer(1, 4 * mm))
    story.append(callout(
        "고도화의 원칙 - 자동화보다 설명 가능성",
        "추천과 상대 대응은 외부 API에 의존하지 않는 규칙 기반 모델로 동작한다. 모든 변화는 현재 배치, 역할, 전술 지시, 체력, 상대 성향과 연결해 화면과 리포트에 남기므로 심사자는 결과의 입력과 이유를 모두 확인할 수 있다.",
        s,
    ))
    story.append(PageBreak())

    story.append(section_title("9", "주요 사용 흐름", s))
    story.append(info_table([
        ["단계", "사용자 행동", "감독 경험의 의미"],
        ["01. 매치업", "대한민국과 상대 국가를 직접 선택하고 상대 분석 탭을 연다.", "상대의 약점과 위협을 읽고 경기 계획을 세운다."],
        ["02. 전술 설계", "선발과 후보를 살피고, 4-2-3-1 등 포메이션을 선택하거나 자유 배치한다.", "전술판 위에서 내 선수와 역할을 직접 결정한다."],
        ["03. 전술 실행", "압박·수비 라인·폭·템포·빌드업을 조절한 뒤 경기 재생을 시작한다.", "선택이 경기 지표와 이벤트로 바뀌는 과정을 지켜본다."],
        ["04. 경기 중 개입", "하프타임에 선수 교체와 전술 재변경을 하거나 의사결정 카드를 선택한다.", "초기 전술에 고정되지 않고 흐름에 대응한다."],
        ["05. 결과 해석", "풀타임 뒤 REPORT에서 결과와 A/B 플랜을 비교한다.", "점수보다 선택의 근거와 다음 개선안을 확인한다."],
    ], [25 * mm, 67 * mm, 64 * mm], s))
    story.append(section_title("10", "제출 적합성 및 운영 원칙", s))
    story.append(info_table([
        ["공모전 요구", "제출본 반영 내용"],
        ["감독처럼 직접 구성·조작", "자유 드래그앤드롭, 포지션 영역, 포메이션 자동 반영, 전술 지시와 교체"],
        ["동적 인터랙션 웹서비스", "라이브 이벤트 모션, 하프타임 의사결정, 결과 리포트, 플랜 비교가 실제 조작에 따라 변화"],
        ["실제 월드컵 데이터 활용", "CC0 공개 데이터 스냅샷의 32개국·832명, 팀·선수·대회 기록을 활용하고 가공 범위를 명시"],
        ["브라우저에서 별도 설치 없이 실행", "정적 JSON과 브라우저 로직으로 작동하며 외부 API 키, 회원가입, 결제가 필요 없음"],
        ["저작권·공정성", "선수 사진·외부 로고·유료 API를 제외하고 데이터 출처·라이선스·파생 지수의 비공식성을 공개"],
    ], [53 * mm, 103 * mm], s))
    story.append(Spacer(1, 5 * mm))
    story.append(callout(
        "제출용 확인 사항",
        "기획서는 공모전이 요청한 서비스 개요, 감독 경험 설계 의도, 페이지 구성, 핵심 인터랙션 명세, 데이터 활용 방식, 주요 사용 흐름을 모두 포함한다. 최종 산출물 단계에서는 배포 URL, GitHub 저장소, YouTube 시연 영상을 함께 제출하고, 시연 영상에서 선수 배치·전술 설정·경기 중 개입·결과 화면을 순서대로 보여 준다.",
        s,
        MINT,
    ))
    story.append(Spacer(1, 5 * mm))
    story.append(para("데이터 출처 및 참고", s["h2"]))
    story.append(para(
        "1) Mominullptr, FIFA World Cup 2026 Dataset (CC0-1.0): https://github.com/mominullptr/FIFA-World-Cup-2026-Dataset<br/>"
        "2) 데이터 스냅샷·가공 기록: docs/08-실데이터-출처-및-가공기록.md<br/>"
        "3) 대회 공식 안내: https://daker.ai/public/hackathons/world-cup-manager-tactics-web-challenge",
        s["small"],
    ))

    doc.build(story)
    print(OUTPUT)


if __name__ == "__main__":
    build()
