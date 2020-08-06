import { Model } from '@nozbe/watermelondb';
import { field, action } from '@nozbe/watermelondb/decorators';

export default class Task extends Model {
  static table = 'tasks';

  @field('orid') orid;
  @field('salesforce_id') salesforceId;
  @field('type') type;
  @field('status') status;

  @action async updateStatus(status) {
    return this.update((task) => {
      task.status = status;
    });
  }
}
