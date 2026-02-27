
import {VisitorProvider} from "../context/visitor.contex"
export const VisitorProviderComp=({children})=>{
return(
    <VisitorProvider>
        {children}
    </VisitorProvider>
)
}
