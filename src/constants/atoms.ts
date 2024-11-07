import { atom } from 'jotai'
import { LoadType } from '../pages/NewLoad';

export const notSentLoadsAtom = atom<(LoadType & { id: string })[]>([])
