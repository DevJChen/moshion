"use client"

import {useMutation, useQuery} from "convex/react";

import {api} from "@/convex/_generated/api"
import {Id} from "@/convex/_generated/dataModel"
import { Toolbar } from "@/components/toolbar";
import {useMemo} from "react";
import dynamic from "next/dynamic";


interface DocumentIdPageProps {
    params:{
        documentId: Id<"documents">
    };
};

const DocumentIdPage = ({params}: DocumentIdPageProps) => {
    const document = useQuery(api.documents.getById, {
        documentId: params.documentId
    });

    const Editor = useMemo(() => dynamic(() => import("@/components/editor"), {ssr: false}), [])
    const update = useMutation(api.documents.update);
        
    const onChange = (content: string) => {
        update({
            id: params.documentId,
            content
        })
    
    }
    if (document === undefined){
        return (
            <div>
                Not found
            </div>
        )
    }

    if(document === null) {
        return <div>Not found</div>
    }
    return (
        <div className="pb-40">
            <div className="h-[5vh]"/>
            <div className="md:max-w-3xl lg:md-max-w-4xl mx-auto">
                <Toolbar initialData={document}/>
                <Editor 
                    onChange={onChange}
                    initialContent={document.content}
                />
            </div>
        </div>
    );
}

export default DocumentIdPage;