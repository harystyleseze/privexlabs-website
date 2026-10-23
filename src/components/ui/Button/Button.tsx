import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import styles from './Button.module.css'

// Port of the design system's core Button (PrivexLabsDesignSystem.Button).
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

type ButtonProps<T extends ElementType> = {
  as?: T
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children?: ReactNode
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>

const Button = <T extends ElementType = 'button'>({
  as,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}: ButtonProps<T>) => {
  const El = (as || 'button') as ElementType
  return (
    <El
      className={`${styles.btn} ${styles[variant]} ${styles[size]} ${className}`.trim()}
      {...rest}
    >
      {children}
    </El>
  )
}

export default Button
