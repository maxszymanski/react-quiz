import { ReactNode } from 'react'

function Section({ children }: { children: ReactNode }) {
	return <main className="main">{children}</main>
}

export default Section
