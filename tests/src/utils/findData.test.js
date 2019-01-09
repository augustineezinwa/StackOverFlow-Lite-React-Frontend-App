import findData from '../../../src/utils/findData';

const data = [
  { id: 1, fullName: 'emeka ezinwa' },
  { id: 2, fullName: 'josephat tk' },
  { id: 3, fullName: 'donekyu df' }
];

test('findData should be able to obtain fullName of above data', () => {
  expect(findData(data, 'id', 2, 'fullName')).toBe('josephat tk');
})
