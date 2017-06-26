/**
 * Created by guushamm on 3-4-17.
 */
const API_URL = 'http://192.168.24.130/api';

const SMART_TABLE_SETTINGS = {
  actions: {
    position: 'right'
  },
  edit: {
    confirmSave: true
  },
  add: {
    confirmCreate: true
  },
  delete: {
    confirmDelete: true
  },
  pager: {
    perPage: 10
  }
};

export {
  API_URL,
  SMART_TABLE_SETTINGS
};
