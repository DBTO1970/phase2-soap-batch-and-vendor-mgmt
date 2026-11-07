"use client";

import {
  Document,
  Font,
  Image,
  Page,
  PDFDownloadLink,
  StyleSheet,
  Text,
  View,
  Svg,
  Text as SvgText,
  Circle,
} from "@react-pdf/renderer";

const BRAND_COLOR = "#910619";
const NAME_COLOR = "#910619";
const INK_BLACK = "#000000";

Font.register({
  family: "EB Garamond",
  fonts: [
    { src: "/fonts/eb-garamond-regular.woff", fontWeight: 400 },
    { src: "/fonts/eb-garamond-italic.woff", fontWeight: 400, fontStyle: "italic" },
    { src: "/fonts/eb-garamond-bold.woff", fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingRight: 0,
    paddingBottom: 36,
    paddingLeft: 0,
    fontFamily: "Helvetica",
    color: "#222222",
  },
  grid: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  band: {
    width: 612,
    height: 108,
    flexDirection: "row",
    marginBottom: 12,
    borderWidth: 0.75,
    borderColor: BRAND_COLOR,
    position: "relative",
  },
  labelBackground: {
    position: "absolute",
    top: 0.75,
    left: 0.75,
    width: 610.5,
    height: 106.5,
    objectFit: "cover",
  },
  panel: {
    height: "100%",
    padding: 8,
    justifyContent: "center",
  },
  ingredients: {
    width: 180,
  },
  sideA: {
    width: 72,
    alignItems: "center",
    justifyContent: "center",
  },
  sideAText: {
    width: 108,
    textAlign: "center",
    fontSize: 8,
    color: BRAND_COLOR,
    transform: "rotate(90deg)",
  },
  center: {
    width: 180,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "flex-start",
    paddingTop: 4,
  },
  sideB: {
    width: 72,
  },
  overlap: {
    width: 108,
  },
  handcrafted: {
    fontFamily: "EB Garamond",
    marginBottom: 5,
    fontSize: 9,
    fontStyle: "italic",
    textAlign: "center",
    color: NAME_COLOR,
  },
  ingredientsText: {
    fontSize: 8,
    lineHeight: 1.35,
    textAlign: "center",
  },
  ingredientsWeight: {
    fontFamily: "EB Garamond",
    marginTop: 6,
    fontSize: 9,
    textAlign: "center",
    color: NAME_COLOR,
  },
  productName: {
    fontFamily: "EB Garamond",
    fontSize: 15,
    fontWeight: 700,
    marginTop: 2,
    marginBottom: 5,
    color: NAME_COLOR,
  },
  brandDivider: {
    marginBottom: -7,
    position: "relative",
    width: 164,
    height: 26,
  },
  brandDots: {
    position: "absolute",
    top: 5,
    left: 0,
  },
  beanImage: {
    position: "absolute",
    top: 5,
    left: 73,
    width: 18,
    height: 16,
    objectFit: "contain",
  },
  emptyText: {
    fontSize: 8,
    color: "#666666",
  },
});

function BrandingSeparator() {
  const leftDots = [5, 15, 25, 35, 45, 55, 65];
  const rightDots = [99, 109, 119, 129, 139, 149, 159];

  return (
    <View style={styles.brandDivider}>
      <Svg width={164} height={14} viewBox="0 0 164 14" style={styles.brandDots}>
        {[...leftDots, ...rightDots].map((x) => (
          <Circle key={x} cx={x} cy={7} r={2} fill={INK_BLACK} />
        ))}
      </Svg>
      <Image
        src="/coffee_beans.png"
        alt="Coffee bean trio"
        style={styles.beanImage}
      />
    </View>
  );
}

function CurvedBranding() {
  const lines = [
    { text: "Morning Rituals", centerY: 22 },
    { text: "Coffee Soap", centerY: 36 },
  ];
  const fontSize = 14;
  const letterSpacing = 0.2;
  const glyphWidth = (character) => {
    if (character === " ") return 0.3;
    if ("ilI".includes(character)) return 0.3;
    if ("frt".includes(character)) return 0.38;
    if ("mwMW".includes(character)) return 0.85;
    if (/[A-Z]/.test(character)) return 0.68;
    return 0.54;
  };

  return (
    <Svg width={164} height={51} viewBox="0 0 164 51">
      {lines.flatMap(({ text, centerY }) => {
        const characters = Array.from(text);
        const advances = characters.map((character) => glyphWidth(character) * fontSize + letterSpacing);
        const lineWidth = advances.reduce((total, advance) => total + advance, 0) - letterSpacing;
        let cursor = (164 - lineWidth) / 2;

        return characters.map((character, index) => {
          const x = cursor + advances[index] / 2;
          cursor += advances[index];
          const offset = x - 82;
          const y = centerY + 0.003 * offset * offset;
          const angle = Math.atan(0.006 * offset) * (180 / Math.PI);

          return [-0.3, 0, 0.3].map((offsetX) => {
            const glyphX = x + offsetX;
            return (
              <SvgText
                key={`${text}-${index}-${offsetX}`}
                x={glyphX}
                y={y}
                fill={INK_BLACK}
                fontFamily="EB Garamond"
                fontSize={fontSize}
                fontWeight="bold"
                stroke={INK_BLACK}
                strokeWidth={0.6}
                textAnchor="middle"
                transform={`rotate(${angle} ${glyphX} ${y})`}
              >
                {character}
              </SvgText>
            );
          });
        });
      })}
    </Svg>
  );
}

/**
 * @typedef {Object} SoapLabelItem
 * @property {string | number} id
 * @property {string} [key]
 * @property {number} [_printIndex]
 * @property {string} [ProductName]
 * @property {string} [name]
 * @property {string} [Ingredients]
 * @property {string} [ingredients]
 * @property {string | number} [NetWeight]
 * @property {string | number} [netWeight]
 * @property {boolean} [useBackground]
 */

/**
 * @param {{ items?: SoapLabelItem[] }} props
 */
function SoapLabelPDF({ items = [] }) {
  return (
    <Document title="Soap Batch Labels">
      <Page size="LETTER" style={styles.page}>
        <View style={styles.grid}>
          {items.map((item, index) => (
            <View
              key={item.key ?? `${item.id}-${item._printIndex ?? index}`}
              style={styles.band}
              wrap={false}
            >
              {item.useBackground !== false && (
                <Image
                  src="/plant_motif_bg.png"
                  alt=""
                  style={styles.labelBackground}
                />
              )}
              <View style={[styles.panel, styles.ingredients]}>
                <Text style={styles.handcrafted}>— Handcrafted with —</Text>
                <Text style={styles.ingredientsText}>
                  {item.Ingredients ?? item.ingredients ?? "Ingredients not provided"}
                </Text>
                <Text style={styles.ingredientsWeight}>
                  {item.NetWeight ?? item.netWeight
                    ? `— Weight ${item.NetWeight ?? item.netWeight} oz —`
                    : ""}
                </Text>
              </View>
              <View style={[styles.panel, styles.sideA]}>
                <Text style={styles.sideAText}>morningritualsoap.com</Text>
              </View>
              <View style={[styles.panel, styles.center]}>
                <CurvedBranding />
                <BrandingSeparator />
                <Text style={styles.productName}>
                  {item.ProductName ?? item.name ?? "Soap"}
                </Text>
              </View>
              <View style={[styles.panel, styles.sideB]} />
              <View style={[styles.panel, styles.overlap]} />
            </View>
          ))}
          {items.length === 0 && (
            <Text style={styles.emptyText}>Select batches to create labels.</Text>
          )}
        </View>
      </Page>
    </Document>
  );
}

/**
 * @param {{ items?: SoapLabelItem[] }} props
 */
export function SoapLabelPDFDownload({ items = [] }) {
  return (
    <PDFDownloadLink
      document={<SoapLabelPDF items={items} />}
      fileName="soap-labels.pdf"
      style={{
        display: "inline-block",
        borderRadius: 6,
        backgroundColor: items.length ? "#2563eb" : "#9ca3af",
        color: "#ffffff",
        padding: "8px 16px",
        fontSize: 14,
        fontWeight: 600,
        textDecoration: "none",
        pointerEvents: items.length ? "auto" : "none",
      }}
    >
      {({ loading }) => (loading ? "Preparing PDF..." : "Download Label PDF")}
    </PDFDownloadLink>
  );
}

export default SoapLabelPDF;
