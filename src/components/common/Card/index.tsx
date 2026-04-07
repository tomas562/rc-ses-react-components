import {
  Box,
  BoxProps,
  CardProps,
  Card as MuiCard,
  Stack,
  StackProps,
  SxProps,
  Theme,
  Typography,
  TypographyProps,
} from '@mui/material'
import { ReactNode } from 'react'

import palette from '@/theme/palette'

export type RcSesCardProps = Omit<CardProps, 'children' | 'title'> & {
  title: ReactNode
  description?: ReactNode
  children: ReactNode
  leadingActions?: ReactNode
  trailingActions?: ReactNode
  slotProps?: {
    actions?: StackProps
    content?: BoxProps
    description?: TypographyProps
    header?: StackProps
    leadingActions?: StackProps
    title?: TypographyProps
    trailingActions?: StackProps
  }
}

type SxEntry =
  Extract<SxProps<Theme>, ReadonlyArray<unknown>> extends ReadonlyArray<infer T>
    ? T
    : never

function isSxArray(sx: SxProps<Theme>): sx is ReadonlyArray<SxEntry> {
  return Array.isArray(sx)
}

function normalizeSx(sx: SxProps<Theme> | undefined): SxEntry[] {
  if (sx === undefined) {
    return []
  }

  if (isSxArray(sx)) {
    return [...sx]
  }

  return [sx]
}

function RcSesCard({
  title,
  description,
  children,
  leadingActions,
  trailingActions,
  slotProps,
  sx,
  ...cardProps
}: RcSesCardProps) {
  const normalizedSx = normalizeSx(sx)
  const normalizedTitleSx = normalizeSx(slotProps?.title?.sx)
  const normalizedDescriptionSx = normalizeSx(slotProps?.description?.sx)
  const normalizedContentSx = normalizeSx(slotProps?.content?.sx)
  const normalizedActionsSx = normalizeSx(slotProps?.actions?.sx)
  const normalizedLeadingActionsSx = normalizeSx(slotProps?.leadingActions?.sx)
  const normalizedTrailingActionsSx = normalizeSx(slotProps?.trailingActions?.sx)

  const hasActions = Boolean(leadingActions || trailingActions)

  return (
    <MuiCard
      {...cardProps}
      sx={[
        {
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: '1rem', md: '1.5rem' },
          p: { xs: '1.25rem 1.5rem 1.5rem', md: '1.5rem 2rem 2rem' },
        },
        ...normalizedSx,
      ]}
    >
      <Stack {...slotProps?.header} spacing={0.5}>
        <Typography
          color={palette.grey[900]}
          variant='h5'
          {...slotProps?.title}
          sx={[
            {
              lineHeight: '1.75rem',
            },
            ...normalizedTitleSx,
          ]}
        >
          {title}
        </Typography>

        {!!description && (
          <Typography
            color={palette.grey[800]}
            variant='body2'
            {...slotProps?.description}
            sx={[
              {
                fontWeight: 300,
                lineHeight: '1.25rem',
              },
              ...normalizedDescriptionSx,
            ]}
          >
            {description}
          </Typography>
        )}
      </Stack>

      <Box
        {...slotProps?.content}
        sx={[
          {
            alignItems: 'center',
            alignSelf: 'stretch',
            backgroundColor: palette.grey[100],
            borderRadius: '0.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            justifyContent: 'center',
          },
          ...normalizedContentSx,
        ]}
      >
        {children}
      </Box>

      {hasActions && (
        <Stack
          {...slotProps?.actions}
          direction={{ xs: 'column', md: 'row' }}
          sx={[
            {
              alignItems: { xs: 'stretch', md: 'center' },
              justifyContent: { xs: 'stretch', md: 'space-between' },
              pt: '0.5rem',
              width: '100%',
            },
            ...normalizedActionsSx,
          ]}
          spacing={{ xs: 1, md: 3 }}
        >
          {!!leadingActions && (
            <Stack
              {...slotProps?.leadingActions}
              direction={{ xs: 'column', md: 'row' }}
              sx={[
                {
                  alignItems: { xs: 'stretch', md: 'center' },
                  minHeight: { md: '2.75rem' },
                  width: { xs: '100%', md: 'auto' },

                  '& > *': {
                    width: { xs: '100%', md: 'auto' },
                  },
                },
                ...normalizedLeadingActionsSx,
              ]}
            >
              {leadingActions}
            </Stack>
          )}

          {!!trailingActions && (
            <Stack
              {...slotProps?.trailingActions}
              direction={{ xs: 'column', md: 'row' }}
              sx={[
                {
                  alignItems: { xs: 'stretch', md: 'center' },
                  justifyContent: { xs: 'stretch', md: 'flex-end' },
                  width: { xs: '100%', md: 'auto' },

                  '& > *': {
                    width: { xs: '100%', md: 'auto' },
                  },
                },
                ...normalizedTrailingActionsSx,
              ]}
              spacing={{ xs: 1, md: 1.5 }}
            >
              {trailingActions}
            </Stack>
          )}
        </Stack>
      )}
    </MuiCard>
  )
}

export default RcSesCard
