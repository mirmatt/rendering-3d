import { Ref } from "react";
import CubeMesh from "../MeshFactory/MeshFactory";
import style from "./Actions.module.css";
import THREE from "three";

interface ActionsProps {
    createMesh: Function
	removeMesh?: Function
	cameraRef: Ref<THREE.PerspectiveCamera> | undefined
	controlRef: Ref<any> | undefined
}

const Actions: React.FC<ActionsProps> = (props) => {

	const resetCamera = ():void => {
		if (props.cameraRef) {
			props.cameraRef.position.set(0, 0, 10)
			props.cameraRef.lookAt(0,0,0)
		}
	}

    return (
        <div className={style.actionContainer}>
            <button
                onClick={() => {
                    props.createMesh(<CubeMesh color="blue" />);
                }}
            >
                Add Mesh
            </button>

			<button
                onClick={() => {
					console.log(props.cameraRef)
                    props.cameraRef && resetCamera()
                }}
            >
                Reset camera
            </button>
        </div>
    );
};

export default Actions;
