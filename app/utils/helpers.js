import isEqual from 'lodash/isEqual';
import clone from 'lodash/clone';
import { fromJS, List } from 'immutable';

export class StateMonitor {
    constructor(state) {
        this.originalState = state;
        this.state = state;
        this.changed = false;
    }

    hasChanged() {
        return this.changed;
    }

    isChanged() {
        return !isEqual(this.originalState, this.state);
    }

    changeState(state) {
        this.state = state;
        this.changed = true;
    }

    getOriginalState() {
        this.state = clone(this.originalState);
        return this.originalState;
    }
}

export const calendarMerger = (oldData, newData) => {
    if (!oldData.size) {
        return newData;
    } else {
        let mergedData = fromJS([]);
        // check if there is next page or next period
        if (oldData.map(o => o.get('id')).join(' ').indexOf(newData.map(n => n.get('id')).join(' ')) > -1) {
            // new period
            oldData.map(old => {
                const newElem = newData.filter(n => n.get('id') === old.get('id')).first() || fromJS({
                    reservations: [],
                    blockings: [],
                    ical_events: []
                });
                mergedData = mergedData.push(
                    old
                        .set('reservations', old.get('reservations').concat(newElem.get('reservations')).toSet().toList())
                        .set('blockings', old.get('blockings').concat(newElem.get('blockings')).toSet().toList())
                        .set('ical_events', old.get('ical_events').concat(newElem.get('ical_events')).toSet().toList())
                );
            });
            //mergedData = oldData.mergeWith((a, b) => merger(a, b), newData);
        } else {
            // new page
            mergedData = newData;
        }

        return mergedData;
    }
};

const merger = (a, b) => {
    if (List.isList(a) && List.isList(b)) {
        return a.concat(b);
    }
    if (a && a.mergeWith) {
        return a.mergeWith(merger, b);
    }
    return b;
};
