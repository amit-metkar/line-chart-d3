import groupBy from "lodash-es/groupBy";

const data = [
  { user: "SO6lM", value: 5, category: 5 },
  { user: "vwEH33kh8 Bhny", value: 6, category: 5 },
  { user: "e7DwVrmJ", value: 7, category: 6 },
  { user: "Rm6vnmNPRvz", value: 11, category: 7 },
  { user: "cB0hC", value: 9, category: 7 },
  { user: "NlUafWkpjduC3", value: 10, category: 7 },
  { user: "zlTNlewuDKcRl", value: 13, category: 8 },
  { user: "xFapEXx9", value: 12, category: 9 },
  { user: "rFKwr3vSxco3K7", value: 7, category: 9 },
  { user: "stHdo1TV", value: 6, category: 10 },
  { user: "BL ymOGU", value: 13, category: 10 },
  { user: "kn3LTrlFv6", value: 5, category: 11 },
  { user: "uEOJsO", value: 6, category: 14 },
  { user: "BQlhXiIHXUo42I", value: 12, category: 14 },
  { user: "1gzvu", value: 11, category: 14 },
];
const groupedData = groupBy(data, "category");
let updatedData = [];
for (const key in groupedData) {
  if (groupedData.hasOwnProperty(key)) {
    const list = groupedData[key];
    updatedData.push({
      user: list.map((l) => l.user).join(", "),
      // value: list.map((l) => l.value).reduce((l1, l2) => l1 + l2, 0) / list.length,
      value: list.map((l) => l.value).reduce((l1, l2) => l1 + l2, 0),
      category: list[0].category,
    });
  }
}
const sum = updatedData.map((u) => u.value).reduce((u1, u2) => u1 + u2, 0);

updatedData = updatedData.map((u) => ({
  ...u,
  value: Math.round(Number(((u.value / sum) * 100).toFixed(2))),
}));

export default updatedData;
