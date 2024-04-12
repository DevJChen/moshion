"use client"

import {BlockNoteEditor, BlockNoteEditorOptions, PartialBlock} from "@blocknote/core"
import {BlockNoteView, useCreateBlockNote, useBlockNote} from "@blocknote/react";

import "@blocknote/react/style.css"
import { useTheme } from "next-themes";

interface EditorProps {
    onChange: (value: string) => void;
    initialContent?: string;
    editable?: boolean;
};

const Editor = ({
    onChange,
    initialContent,
    editable
}: EditorProps) => {
    
    const {resolvedTheme} = useTheme();
    
        // Convert the initialContent to PartialBlock[] if available
    const initialParsedContent = initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined;

        // Configure the options for useCreateBlockNote
    const options: BlockNoteEditorOptions = {
        initialContent: initialParsedContent,
            // Add any additional options you might need
        defaultStyles: true,
        domAttributes: {"data-theme": resolvedTheme}
    };
    
        // Create the BlockNoteEditor instance
    const editor = useCreateBlockNote(options);

    const handleEditorChange = () => {
        if (editor) {
            onChange(JSON.stringify(editor.document, null, 2));
        }
    };

    return(
        <div>
        <BlockNoteView
            editor={editor}
            theme={resolvedTheme === "dark" ? "dark" : "light"}
            editable={editable}
            onChange={handleEditorChange}
        />
        </div>
    )
}

export default Editor;