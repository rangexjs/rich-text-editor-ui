import type { ConstructorProps } from "./ExternalStore-types";

export class ExternalStore<State> {
	#state;
	#listeners: (() => void)[] = [];

	constructor({ state }: ConstructorProps<State>) {
		this.#state = state;
	}

	updateState(props: Partial<State>) {
		for (const key in props) {
			if (props[key] === undefined) {
				delete props[key];
			}
		}

		this.#state = { ...this.#state, ...props };

		for (const listener of this.#listeners) {
			listener();
		}
	}

	subscribe(listener: () => void) {
		this.#listeners.push(listener);

		return () => {
			this.#listeners.filter((callback) => callback !== listener);
		};
	}

	getSnapshot() {
		return this.#state;
	}
}
