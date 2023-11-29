import { Ref, useState } from "react";
import style from "./Actions.module.css";
import THREE from "three";
import MeshFactory from "../MeshFactory/MeshFactory";

interface ActionsProps {
    createMesh: Function
	removeMesh?: Function
	cameraRef: Ref<THREE.PerspectiveCamera> | undefined
	sceneRef?: Ref<HTMLDivElement>
}

const Actions: React.FC<ActionsProps> = (props) => {
	const [meshType, setMeshType] = useState<string>("cube")
	const [meshColor, setMeshColor] = useState<string>("#32a852")

	const resetCamera = ():void => {
		if (props.cameraRef && props.sceneRef) {
			props.cameraRef.position.set(0, 0, 10)
			props.cameraRef.lookAt(0,0,0)
			props.sceneRef.current.focus()
		}
	}

    return (
        <div className={style.actionContainer}>
            <button
                onClick={() => {
                    props.createMesh(<MeshFactory color={meshColor} type={meshType} />);
                }}
            >
                Add Mesh
            </button>
			<select onChange={(ev) => {
				setMeshType(ev.target.value)
			}} defaultValue="cube">
				<option value="cube">Cube</option>
				<option value="icosahedron">Icosahedron</option>
				<option value="tetrahedron">Tetrahedron</option>
				<option value="sphere">Sphere</option>
			</select>
			<input type="color" onChange={(ev) => {
				setMeshColor(ev.target.value)
			}} defaultValue="#32a852"></input>
			<br/>
			<button
                onClick={() => {
                    props.cameraRef && resetCamera()
                }}
            >
                Reset camera
            </button>
			<div className={style.controlsInfo}>
				<p>Press WASD to move the camera around</p>
				<p>Rotate the wheel to zoom</p>
				<p>Press the wheel button and move the mouse to rotate the camera</p>
				<p>You can use the arrow keys to move the camera aswell</p>
				<p>Double click on a mesh to select it</p>
			</div>
        </div>
    );
};

export default Actions;