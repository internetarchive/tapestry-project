import { useAsyncAction } from 'tapestry-core-client/src/components/lib/hooks/use-async-action'
import { resource } from '../services/rest-resources'

export function useConvertToPDF() {
  const { trigger, loading, data } = useAsyncAction(({ signal }, id: string) =>
    resource('items').update({ id }, { type: 'pdf' }, undefined, { signal }),
  )

  return {
    convertToPDF: trigger,
    conversionStarted: loading || !!data,
  }
}
