import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(props.value);

    const activateEditMode = () => {
      setEditMode(true);
      setTitle(props.value);
    }

    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }
    return (
        <span>
            {
                editMode
                    ? <input
                        value={title}
                        autoFocus
                        onBlur={activateViewMode}
                        onChange={onChangeHandler}
                    />
                    : <span onDoubleClick={activateEditMode}>{props.value}</span>
            }

        </span>
    )
}