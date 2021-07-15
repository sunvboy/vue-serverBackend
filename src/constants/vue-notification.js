
export const notification = (type,text) => {
    return this.$notify({
        group: "foo",
        type: type,
        title: "Thông báo",
        text: text
      });
}
