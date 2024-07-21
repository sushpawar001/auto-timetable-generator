import { ReactNode } from "react";

/**
 * ToolTip component
 * 
 * Note: The parent div of this component should have `group` and `relative` classes
 */
export default function ToolTip({ content }: { content: ReactNode }) {
    return (
        <div className="bg-red-500 p-2 rounded-md group-hover:flex hidden opacity-0 group-hover:opacity-100 absolute -bottom-2 translate-y-full left-1/2 -translate-x-1/2 ease-out group-hover:duration-1000 transition-all">
            <span className="text-white whitespace-nowrap">{content}</span>
            <div className="bg-inherit rotate-45 p-1 absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2"></div>
        </div>
    );
}
