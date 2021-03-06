import { LinkedList } from '../Linkedlist';

type TestData = {
  key: number;
  customValue: string;
};

describe('LinkedList', () => {
  it('should create empty linked list', () => {
    const linkedList = new LinkedList();
    expect(linkedList.toString()).toBe('');
  });

  it('should append node to linked list', () => {
    const linkedList = new LinkedList();

    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();

    linkedList.append(1);
    linkedList.append(2);

    expect(linkedList.toString()).toBe('1,2');
    expect(linkedList.tail?.next).toBeNull();
  });

  it('should prepend node to linked list', () => {
    const linkedList = new LinkedList();

    linkedList.prepend(2);
    expect(linkedList.head).toBe(2);
    expect(linkedList.tail).toBe(2);

    linkedList.append(1);
    linkedList.prepend(3);

    expect(linkedList.toString()).toBe('3,2,1');
  });

  it('should delete node by value from linked list', () => {
    const linkedList = new LinkedList();

    expect(linkedList.delete(5)).toBeNull();

    linkedList.append(1);
    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);
    linkedList.append(3);
    linkedList.append(3);
    linkedList.append(4);
    linkedList.append(5);

    expect(linkedList.head?.toString()).toBe('1');
    expect(linkedList.tail?.toString()).toBe('5');

    const deletedNode = linkedList.delete(3);
    expect(deletedNode?.value).toBe(3);
    expect(linkedList.toString()).toBe('1,1,2,4,5');

    linkedList.delete(3);
    expect(linkedList.toString()).toBe('1,1,2,4,5');

    linkedList.delete(1);
    expect(linkedList.toString()).toBe('2,4,5');

    expect(linkedList.head?.toString()).toBe('2');
    expect(linkedList.tail?.toString()).toBe('5');

    linkedList.delete(5);
    expect(linkedList.toString()).toBe('2,4');

    expect(linkedList.head?.toString()).toBe('2');
    expect(linkedList.tail?.toString()).toBe('4');

    linkedList.delete(4);
    expect(linkedList.toString()).toBe('2');

    expect(linkedList.head?.toString()).toBe('2');
    expect(linkedList.tail?.toString()).toBe('2');

    linkedList.delete(2);
    expect(linkedList.toString()).toBe('');
  });

  it('should delete linked list tail', () => {
    const linkedList = new LinkedList();

    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);

    expect(linkedList.head?.toString()).toBe('1');
    expect(linkedList.tail?.toString()).toBe('3');

    const deletedNode1 = linkedList.deleteTail();

    expect(deletedNode1?.value).toBe(3);
    expect(linkedList.toString()).toBe('1,2');
    expect(linkedList.head?.toString()).toBe('1');
    expect(linkedList.tail?.toString()).toBe('2');

    const deletedNode2 = linkedList.deleteTail();

    expect(deletedNode2?.value).toBe(2);
    expect(linkedList.toString()).toBe('1');
    expect(linkedList.head?.toString()).toBe('1');
    expect(linkedList.tail?.toString()).toBe('1');

    const deletedNode3 = linkedList.deleteTail();

    expect(deletedNode3?.value).toBe(1);
    expect(linkedList.toString()).toBe('');
    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();
  });

  it('should delete linked list head', () => {
    const linkedList = new LinkedList();

    expect(linkedList.deleteHead()).toBeNull();

    linkedList.append(1);
    linkedList.append(2);

    expect(linkedList.head?.toString()).toBe('1');
    expect(linkedList.tail?.toString()).toBe('2');

    const deletedNode1 = linkedList.deleteHead();

    expect(deletedNode1?.value).toBe(1);
    expect(linkedList.toString()).toBe('2');
    expect(linkedList.head?.toString()).toBe('2');
    expect(linkedList.tail?.toString()).toBe('2');

    const deletedNode2 = linkedList.deleteHead();

    expect(deletedNode2?.value).toBe(2);
    expect(linkedList.toString()).toBe('');
    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();
  });

  it('should create linked list from array', () => {
    const linkedList = new LinkedList();
    linkedList.fromArray([1, 1, 2, 3, 3, 3, 4, 5]);

    expect(linkedList.toString()).toBe('1,1,2,3,3,3,4,5');
  });

  it('should find node by means of custom compare function', () => {
    const comparatorFunction = (a: TestData, b: TestData) => {
      if (a.customValue === b.customValue) {
        return 0;
      }

      return a.customValue < b.customValue ? -1 : 1;
    };

    const linkedList: LinkedList<TestData> = new LinkedList(comparatorFunction);

    linkedList
      .append({ key: 1, customValue: 'test1' })
      .append({ key: 2, customValue: 'test2' })
      .append({ key: 3, customValue: 'test3' });

    const node = linkedList.find({
      value: { value: 2, customValue: 'test2' },
    });

    expect(node).toBeDefined();
    expect(node?.value?.key).toBe(2);
    expect(node?.value?.customValue).toBe('test2');
    expect(linkedList.find({ value: 2, customValue: 'test5' })).toBeNull();
  });

  it('should reverse linked list', () => {
    const linkedList = new LinkedList();

    // Add test values to linked list.
    linkedList.append(1).append(2).append(3);

    expect(linkedList.toString()).toBe('1,2,3');
    expect(linkedList.head?.value).toBe(1);
    expect(linkedList.tail?.value).toBe(3);

    // Reverse linked list.
    linkedList.reverse();
    expect(linkedList.toString()).toBe('3,2,1');
    expect(linkedList.head?.value).toBe(3);
    expect(linkedList.tail?.value).toBe(1);

    // Reverse linked list back to initial state.
    linkedList.reverse();
    expect(linkedList.toString()).toBe('1,2,3');
    expect(linkedList.head?.value).toBe(1);
    expect(linkedList.tail?.value).toBe(3);
  });
});
