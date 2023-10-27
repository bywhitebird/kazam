import { Effect, Ref, pipe } from 'effect'

import { type MetadataState, MetadataStateService } from '../states/metadata-state'

type Metadata = Parameters<Parameters<MetadataState['modify']>[0]>[0]

export const getMetadata = () =>
  pipe(
    MetadataStateService,
    Effect.flatMap(metadataState =>
      Ref.get(metadataState),
    ),
  )

export const setMetadata = (metadata: Metadata) =>
  pipe(
    MetadataStateService,
    Effect.tap(metadataState =>
      Ref.set(metadataState, metadata),
    ),
  )
