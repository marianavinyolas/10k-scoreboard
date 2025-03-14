interface IInactivePlayer {
	name: string
	score: number
	playerIndex: number
}

const InactivePlayer = ({ name, score, playerIndex }: IInactivePlayer) => {
	return (
		<article className='w-full flex gap-2 py-2 border border-slate-500 rounded bg-gray-100 dark:bg-slate-800'>
			<div className='w-10 flex justify-center border-r border-slate-500'>
				{playerIndex}
			</div>
			<div className='w-20 flex justify-end pr-2 border-r border-slate-500'>
				{score}
			</div>
			<div className='flex-1 truncate'>{name}</div>
		</article>
	)
}

export default InactivePlayer
