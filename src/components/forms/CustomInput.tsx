import { Input } from '@nextui-org/react'
import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

type Props = {
  form: any
  type?: string
  label: string
  name: string
}

const CustomInput = ({ form, type = 'text', label, name }: Props) => {
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)

  if (!form) return null

  return (
    <Input
      {...form.register(name)}
      variant="underlined"
      type={type == 'password' ? (isVisible ? 'text' : 'password') : type}
      name={name}
      errorMessage={form.formState.errors[name]?.message}
      endContent={
        type == 'password' && (
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <FaEye className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        )
      }
      label={label}
    />
  )
}

export default CustomInput
