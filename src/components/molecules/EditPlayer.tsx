import { IcPen, IcTrash } from '@atoms'

interface IEditPlayer {
	name: string
	score: number
	playerIndex: number
	onDelete: (playerIndex:number) => void
	onEdit: (playerIndex:number) => void
}

const EditPlayer = ({ name, score, playerIndex, onDelete, onEdit }: IEditPlayer) => {

	return (
		<article className='w-full flex gap-2 py-2 border border-slate-500 rounded bg-gray-100 dark:bg-slate-800'>
		<div className='w-10 flex justify-center border-r border-slate-500'>
			{playerIndex + 1}
		</div>
		<div className='w-20 flex justify-end pr-2 border-r border-slate-500'>
			{score}
		</div>
		<div className='flex-1 truncate'>{name}</div>
		<div className='w-20 flex justify-between gap-2 border-l border-slate-500 px-2'>
			<button onClick={()=>onDelete(playerIndex)}>
				<IcTrash className='w-6 h-6 fill-neutral-700 dark:fill-neutral-300' />
			</button>
			<button onClick={()=>onEdit(playerIndex)}>
				<IcPen className='w-5 h-5 fill-neutral-700 dark:fill-neutral-300' />
			</button>
		</div>
	</article>
	)
}

export default EditPlayer