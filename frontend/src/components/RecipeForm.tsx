import { useForm } from '@tanstack/react-form'
import TEditor from '../components/TrixEditor'
import { RecipeType } from '../recipes'


type RecipeFormProps = {
  onSubmit?: () => void
  defaultValues?: RecipeType
}

const DEFAULT = {
  id: null,
  title: '',
  instructions: '',
  cover: '',
  source: '',
  portions: 2,
}

export default function RecipeForm({ defaultValues = DEFAULT, onSubmit }: RecipeFormProps) {
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
        >
          <div className='flex flex-col'>
            {/* A type-safe field component*/}
            <form.Field
              name="title"
              children={(field) => {
                // Avoid hasty abstractions. Render props are great!
                return (
                  <>
                    <label htmlFor={field.name}>Title:</label>
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
              name="cover"
              children={(field) => {
                // Avoid hasty abstractions. Render props are great!
                return (
                  <>
                    <label htmlFor={field.name}>Cover:</label>
                    <input
                      type="url"
                      id={field.name}
                      name={field.name}
                      value={field.state.value || ''}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.value && (
                      <>
                        <span>Preview:</span>
                        <img src={field.state.value || ''} className='max-w-[250px]' />
                      </>
                    )}
                  </>
                )
              }}
            />
          </div>
          <div className='flex flex-col'>
            {/* A type-safe field component*/}
            <form.Field
              name="source"
              children={(field) => {
                return (
                  <>
                    <label htmlFor={field.name}>Source:</label>
                    <input
                      type="url"
                      id={field.name}
                      name={field.name}
                      value={field.state.value || ''}
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
              name="portions"
              children={(field) => {
                return (
                  <>
                    <label htmlFor={field.name}>Portions:</label>
                    <input
                      id={field.name}
                      type="number"
                      name={field.name}
                      value={field.state.value || ''}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </>
                )
              }}
            />
          </div>
          <div>
            {/* A type-safe field component*/}
            <form.Field
              name="instructions"
              children={(field) => {
                // Avoid hasty abstractions. Render props are great!
                return (
                  <>
                    <label htmlFor={field.name}>Instructions:</label>
                    <TEditor 
                      value={field.state.value}
                      onChange={field.handleChange}
                    />
                  </>
                )
              }}
            />
          </div>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <button type="submit" disabled={!canSubmit} className='px-3 py-2 bg-teal-400 mt-5 rounded disabled:opacity-15'>
                {isSubmitting ? '...' : 'Submit'}
              </button>
            )}
          />
        </form>
  )
}
