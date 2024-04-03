import { useForm } from '@tanstack/react-form'
import TEditor from './TrixEditor'
import { RecipeType } from '../recipes'


type IngredientFormProps = {
  onSubmit?: () => void
  defaultValues?: RecipeType
  submit?: string
}

const DEFAULT = {
  id: null,
  ingredient: '',
  quantity: null,
  unit: '',
  notes: '',
}

export default function IngredientForm({ defaultValues = DEFAULT, onSubmit, submit = 'Submit' }: IngredientFormProps) {
  const form = useForm({
    defaultValues,
    onSubmit,
  })
  return (
      <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          className='flex items-start gap-2'
        >
          <div className='flex flex-col'>
            {/* A type-safe field component*/}
            <form.Field
              name="ingredient"
              children={(field) => {
                // Avoid hasty abstractions. Render props are great!
                return (
                  <>
                    <label htmlFor={field.name}>Name:</label>
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      required
                    />
                  </>
                )
              }}
            />
          </div>
          <div className='flex flex-col'>
            {/* A type-safe field component*/}
            <form.Field
              name="quantity"
              children={(field) => {
                return (
                  <>
                    <label htmlFor={field.name}>Quantity:</label>
                    <input
                      id={field.name}
                      type="number"
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </>
                )
              }}
            />
          </div>
          <div className='flex flex-col'>
            {/* A type-safe field component*/}
            <form.Field
              name="unit"
              children={(field) => {
                // Avoid hasty abstractions. Render props are great!
                return (
                  <>
                    <label htmlFor={field.name}>Unit:</label>
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </>
                )
              }}
            />
          </div>
          <div className='flex flex-col'>
            {/* A type-safe field component*/}
            <form.Field
              name="notes"
              children={(field) => {
                // Avoid hasty abstractions. Render props are great!
                return (
                  <>
                    <label htmlFor={field.name}>Notes:</label>
                    <textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </>
                )
              }}
            />
          </div>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <button type="submit" disabled={!canSubmit} className='px-3 py-2 bg-teal-400 rounded disabled:opacity-1 self-center'>
                {isSubmitting ? '...' : submit}
              </button>
            )}
          />
        </form>
  )
}
