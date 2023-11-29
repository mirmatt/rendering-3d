import { Ref, useState } from "react";
import style from "./Actions.module.css";
import THREE from "three";
import MeshFactory from "../MeshFactory/MeshFactory";
import styles from "./Actions.module.css"

interface ActionsProps {
    createMesh: Function
	removeMesh?: Function
	cameraRef: Ref<THREE.PerspectiveCamera> | undefined
	sceneRef?: Ref<HTMLDivElement>
}
/**
 *
 * @returns JSX.Element
 * @description Holds all the actions present in the UI, excluding the list of all the present meshes.
 * @description To create a new Mesh we use 2 parameters: Geometry or Type and Color. Both of those are handled by standard inputs.
 * @description There is a small screen check to hide the control tutorial in case the sandbox is run on mobile
 * 
 * @ignore The 3 errors at line 29, 30 and 31 are a small bug between Typescript and React, where the Ref Type doesn't export the .current property.
 */
const Actions: React.FC<ActionsProps> = (props) => {
	const [meshType, setMeshType] = useState<string>("cube")
	const [meshColor, setMeshColor] = useState<string>("#32a852")
	const [screenWidth, _] = useState<number>(window.innerWidth)

	const resetCamera = ():void => {
		if (props.cameraRef && props.sceneRef) {
			props.cameraRef.position.set(0, 5, 10)
			props.cameraRef.lookAt(0, 0, 0)
			props.sceneRef.current.focus()
		}
	}

    return (
        <div className={style.actionContainer}>
            <button
                onClick={() => {
                    props.createMesh(<MeshFactory color={meshColor} type={meshType} />);
                }}
				className={styles.addAction}
            >
                Add Mesh
            </button>
			<select onChange={(ev) => {
				setMeshType(ev.target.value)
			}} defaultValue="cube" className={styles.shapePicker}>
				<option value="cube">Cube</option>
				<option value="icosahedron">Icosahedron</option>
				<option value="tetrahedron">Tetrahedron</option>
				<option value="sphere">Sphere</option>
			</select>
			<input type="color" onChange={(ev) => {
				setMeshColor(ev.target.value)
			}} defaultValue="#32a852" className={styles.colorPicker}></input>
			<br/>
			<button
                onClick={() => {
                    props.cameraRef && resetCamera()
                }}
            className={styles.resetCameraAction} >
                Reset camera
            </button>
			{screenWidth > 768 && (
			<div className={style.controlsInfo}>
				<p>Press WASD to move the camera around</p>
				<p>Rotate the wheel to zoom</p>
				<p>Press the wheel button and move the mouse to rotate the camera</p>
				<p>You can use the arrow keys to move the camera aswell</p>
				<p>Double click on a mesh to select it</p>
			</div>
			)}
        </div>
    );
};

export default Actions;
