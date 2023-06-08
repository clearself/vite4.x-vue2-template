function Queue() {
    let items = [];

    // 向队列添加元素（一个或多个）
    this.enqueue = (element) => {
        if (element instanceof Array) items = items.concat(element);
        else items.push(element);
    };

    // 从队列移除元素
    this.dequeue = () => {
        return items.shift();
    };

    // 返回队列中的第一个元素
    this.front = () => {
        return items[0];
    };

    // 判断队列是否为空
    this.isEmpty = () => {
        return items.length === 0;
    };

    // 返回队列的长度
    this.size = () => {
        return items.length;
    };

    // 清空队列
    this.clear = () => {
        items = [];
    };
    // 打印队列内的所有元素
    this.print = function () {
        return JSON.stringify(items);
    };
}
export default Queue;
