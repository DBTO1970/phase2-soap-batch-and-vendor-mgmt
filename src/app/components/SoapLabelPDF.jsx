"use client";

import {
  Document,
  Page,
  PDFDownloadLink,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

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
    borderColor: "#555555",
  },
  panel: {
    height: "100%",
    padding: 8,
    justifyContent: "center",
  },
  ingredients: {
    width: 180,
    borderRightWidth: 0.5,
    borderRightColor: "#999999",
  },
  sideA: {
    width: 72,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 0.5,
    borderRightColor: "#999999",
  },
  sideAText: {
    width: 108,
    textAlign: "center",
    fontSize: 8,
    transform: "rotate(90deg)",
  },
  center: {
    width: 180,
    alignItems: "center",
    textAlign: "center",
    borderRightWidth: 0.5,
    borderRightColor: "#999999",
  },
  sideB: {
    width: 72,
    borderRightWidth: 0.5,
    borderRightColor: "#999999",
  },
  overlap: {
    width: 108,
  },
  panelHeading: {
    marginBottom: 5,
    fontSize: 7,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 0.7,
  },
  ingredientsText: {
    fontSize: 8,
    lineHeight: 1.35,
  },
  productName: {
    fontSize: 15,
    fontWeight: 700,
    marginBottom: 5,
  },
  netWeight: {
    fontSize: 9,
  },
  emptyText: {
    fontSize: 8,
    color: "#666666",
  },
});

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
              <View style={[styles.panel, styles.ingredients]}>
                <Text style={styles.panelHeading}>Ingredients</Text>
                <Text style={styles.ingredientsText}>
                  {item.Ingredients ?? item.ingredients ?? "Ingredients not provided"}
                </Text>
              </View>
              <View style={[styles.panel, styles.sideA]}>
                <Text style={styles.sideAText}>morningritualsoap.com</Text>
              </View>
              <View style={[styles.panel, styles.center]}>
                <Text style={styles.productName}>
                  {item.ProductName ?? item.name ?? "Soap"}
                </Text>
                <Text style={styles.netWeight}>
                  {item.NetWeight ?? item.netWeight
                    ? `${item.NetWeight ?? item.netWeight} oz`
                    : ""}
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
