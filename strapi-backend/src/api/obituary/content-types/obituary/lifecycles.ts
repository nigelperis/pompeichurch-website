export default {
  async beforeUpdate(event) {
    const { data } = event.params;

    if ('funeralDetails' in data) {
      if (data.funeralDetails && data.funeralDetails.trim() !== '') {
        data.funeralDetailsUpdatedAt = new Date().toISOString();
      } else {
        data.funeralDetailsUpdatedAt = null;
      }
    }
  },
};
