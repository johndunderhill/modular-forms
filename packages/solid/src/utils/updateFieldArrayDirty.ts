import { batch, untrack } from 'solid-js';
import type {
  InternalFieldArrayStore,
  FieldValues,
  FormStore,
  ResponseData,
} from '../types';
import { updateFormDirty } from './updateFormDirty';

/**
 * Updates the dirty state of a field array.
 *
 * @param form The form of the field array.
 * @param fieldArray The store of the field array.
 */
export function updateFieldArrayDirty<
  TFieldValues extends FieldValues,
  TResponseData extends ResponseData
>(
  form: FormStore<TFieldValues, TResponseData>,
  fieldArray: InternalFieldArrayStore
): void {
  untrack(() => {
    // Check if field array is dirty
    const dirty =
      fieldArray.getStartItems().join() !== fieldArray.getItems().join();

    // Update dirty state of field array if necessary
    if (dirty !== fieldArray.getDirty()) {
      batch(() => {
        fieldArray.setDirty(dirty);

        // Update dirty state of form
        updateFormDirty(form, dirty);
      });
    }
  });
}
