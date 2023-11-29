import CubeMesh from "../components/MeshFactory/MeshFactory";
import squirrelImg from "../data/associatedImg/squirrel.jpg"

// meshes that will be loaded at the start of the scene
const baseMeshes = [
	{
		id: "gray",
		mesh: <CubeMesh color="gray" position={[0, 0, 0]} type="cube" content={
			<a target="_blank" href={squirrelImg}>Squirrell</a>
		} />,
	},
	{
		id: "blue",
		mesh: <CubeMesh color="blue" position={[3, 3, 0]} type="icosahedron" />,
	},
	{
		id: "red",
		mesh: <CubeMesh color="red" position={[-3, -3, 0]} type="tetrahedron" />,
	},
	{
		id: "orange",
		mesh: <CubeMesh color="orange" position={[-3, -6, 0]} type="sphere" />,
	},
]

export default baseMeshes