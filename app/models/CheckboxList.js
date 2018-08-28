import isEmpty from 'lodash/isEmpty';
import forOwn from 'lodash/forOwn';
import findKey from 'lodash/findKey';

export default class CheckboxList {
    constructor(list) {
        this.items = list.items;
        this.selectedItems = {};
    }

    setItems(items) {
        this.items = items;
        return this;
    }

    isAllSelected() {
        const selected = this.selectedItems;
        let isAll = true;
        this.items.forEach(t => {
            if (!selected[t]) {
                isAll = false;
                return;
            }
        });

        return !isEmpty(selected) && isAll;
    }

    toggleItem(id) {
        const selected = this.selectedItems;
        if (id === 'all') {
            const isAll = this.isAllSelected();
            const all = {};
            this.items.map(t => all[t] = !isAll);
            this.selectedItems = all;
        } else {
            const isSelected = !!this.selectedItems[id];
            selected[id] = !isSelected;
            this.selectedItems = selected;
        }

        return this;
    }

    isItemChecked(id) {
        return this.selectedItems[id];
    }

    isSomeChecked() {
        return !!findKey(this.selectedItems, t => t === true);
    }
}
