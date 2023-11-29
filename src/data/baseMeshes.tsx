import CubeMesh from "../components/MeshFactory/MeshFactory";
import lakeImg from "../data/associatedImg/lake.jpg"
import mountainImg from "../data/associatedImg/mountain.jpg"
import riverImg from "../data/associatedImg/river.jpg"
import squirrelImg from "../data/associatedImg/squirrel.jpg"

// meshes that will be loaded at the start of the scene
const baseMeshes = [
	{
		id: "gray",
		mesh: <CubeMesh color="gray" position={[0, 0, 0]} type="cube" content={
			<a target="_blank" href={lakeImg}>Lake</a>
		} />,
	},
	{
		id: "blue",
		mesh: <CubeMesh color="blue" position={[3, 3, 0]} type="icosahedron" content={
			<a target="_blank" href={mountainImg}>Mountain</a>
		} />,
	},
	{
		id: "red",
		mesh: <CubeMesh color="red" position={[-3, -3, 0]} type="tetrahedron" content={
			<a target="_blank" href={riverImg}>River</a>
		}/>,
	},
	{
		id: "orange",
		mesh: <CubeMesh color="orange" position={[-3, -6, 0]} type="sphere" content={
			<a target="_blank" href={squirrelImg}>Squirrel</a>
		}/>,
	},
]

export default baseMeshes