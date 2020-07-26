export const deleteItem = (item, items) => items.filter(i => i.id !== item.id);

export const updateItem = (item, items) => items.map((i) => {
    if (i.id === item.id) return item;
    return i;
});

export const createItem = (collection , payload) => {
    let new_id = 0;
    if(collection.length){
        const prev_id = collection[collection.length - 1].id
        new_id = prev_id + 1;
    }
    payload['id'] = new_id;
    let updated_value = [...collection, payload];
    return updated_value;
}