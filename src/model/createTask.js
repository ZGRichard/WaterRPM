export async function createTask(db, data) {
  return db.action(async (action) => {
    return db.collections.get('tasks').create((task) => {
      task._raw.id = data.id;
      task.orid = data.orid;
      task.type = data.type;
      task.status = data.status;
      task.salesforceId = data.salesforceId;
    });
  });
}
