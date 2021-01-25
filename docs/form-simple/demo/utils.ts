export const delay = (timeout = 0) =>
  new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

export const layout = { labelCol: { span: 4 }, wrapperCol: { span: 16 } };
export const tailLayout = { wrapperCol: { offset: 4, span: 16 } };
