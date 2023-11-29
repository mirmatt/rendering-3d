import { Box, Icosahedron, Sphere, Tetrahedron } from "@react-three/drei"
import { BufferGeometry } from "three"


interface genericMapping {
	[key: string] : React.ReactNode
}

const geometriesMapping: genericMapping = {
	"cube" : <boxGeometry args={[1, 1, 1]}/>,
	"icosahedron" : <icosahedronGeometry args={[1, 1]}/>,
	"tetrahedron" : <tetrahedronGeometry args={[1, 1]}/>,
	"sphere" : <sphereGeometry args={[1]}/>
}

export default geometriesMapping