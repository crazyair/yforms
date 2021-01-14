export const getOnlyKey = () => {
  const keyMap = new Set();
  return (index, pIndex, name) => {
    let _index = name ? name.toString() : index;
    let key = pIndex ? `${pIndex}_${_index}` : _index;
    if (keyMap.has(key)) {
      _index = `${_index}_${index}`;
      key = pIndex ? `${pIndex}_${_index}` : _index;
    }
    keyMap.add(key);
    return key;
  };
};
