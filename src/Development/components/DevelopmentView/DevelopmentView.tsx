import { useEffect, useRef } from "react";
import type { DevelopmentViewProps } from "./DevelopmentView-types";

import "../../../Production/global.css";

export const DevelopmentView = ({
	innerRoot: children,
}: DevelopmentViewProps) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!ref.current) {
			return;
		}
		ref.current.append(children);
	}, [children]);

	return <div className="mx-auto max-w-6xl p-4" ref={ref} />;
};
