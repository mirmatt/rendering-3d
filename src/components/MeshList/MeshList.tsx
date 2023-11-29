import trashcan from "../../icons/trash-can-regular.svg";
import styles from "./MeshList.module.css";

interface MeshListProps {
    meshesList: string[];
    deleteMesh: Function;
}

/**
 * 
 * @description Simple component to make it easier to modify the elements of the Mesh List. Contains the button to delete a mesh, and they are identified by their unique ID
 */
const MeshList: React.FC<MeshListProps> = (props) => {
    return (
        <div className={styles.meshListContainer}>
            {props.meshesList.map((meshId) => {
                return (
                    <div className={styles.meshRowContainer}>
						<img
                            src={trashcan}
                            alt="delete-mesh-icon"
                            onClick={() => {
                                props.deleteMesh(meshId);
                            }}
                        ></img>
                        <p>{meshId}</p>
                        
                    </div>
                );
            })}
        </div>
    );
};

export default MeshList;
