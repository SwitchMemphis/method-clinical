export const DOCUMENT_GUIDE = [
  {
    id: "product",
    number: "01",
    title: "Product name",
    description:
      "Begin with the compound name. Compare the name on the document with the product on the vial label.",
    caption: "Identify the compound.",
  },
  {
    id: "lot",
    number: "02",
    title: "Lot identifier",
    description:
      "Match the lot number on the vial to the lot identifier on its Certificate of Analysis.",
    caption: "Follow the specific lot.",
  },
  {
    id: "tests",
    number: "03",
    title: "Tests listed",
    description:
      "Review the tests and methods listed for that lot. The document should make its scope clear.",
    caption: "Understand what was tested.",
  },
  {
    id: "results",
    number: "04",
    title: "Reported results",
    description:
      "Read the reported results alongside the tests, methods and any reference limits included on the document.",
    caption: "Review the recorded results.",
  },
] as const;
