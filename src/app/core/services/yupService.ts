import * as Yup from 'yup';

Yup.setLocale({
  mixed: {
    required: '此欄位不得為空值'
  },
  string: {
    max: '長度不得超過 ${max} 字元',
    min: '長度不得小於 ${min} 字元'
  }
});
