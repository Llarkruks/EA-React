import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Organization } from '../../models/Organization';
import { useEffect } from 'react';
import Button from '../Button/Button';

const schema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters.' }),
});

export type OrganizationFormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: OrganizationFormData) => void;
  initialData?: Organization;
  onCancel: () => void;
}

/**
 * OrganizationForm component - Displays a form for creating/editing organizations
 * Handles only form rendering and validation, logic is managed by parent component
 */
const OrganizationForm = ({ onSubmit, initialData, onCancel }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OrganizationFormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
      });
    }
  }, [initialData, reset]);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
      className="mb-4 p-3 border rounded bg-light"
    >
      <h4 className="mb-3">
        {initialData ? 'Edit Organization' : 'New Organization'}
      </h4>

      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          {...register('name')}
          id="name"
          type="text"
          className="form-control"
        />
        {errors.name && (
          <p className="text-danger">{errors.name.message}</p>
        )}
      </div>

      <div className="d-flex justify-content-end">
        <Button type="button" className="me-2" color="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" color="primary">
          {initialData ? 'Update' : 'Add'}
        </Button>
      </div>
    </form>
  );
};

export default OrganizationForm;