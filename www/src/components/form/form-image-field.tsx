import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FormFieldProps } from '@/pages/auth/types/form-field-props.type'
import { FieldPath, FieldValues } from 'react-hook-form'

export const FormImageField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    ...props
}: FormFieldProps<TFieldValues, TName>) => {
    return (
        <FormField
            {...props}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                        <Input
                            type="file"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.onChange(e.target.files?.[0])}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
FormImageField.displayName = 'FormImageField'
