import trashcan from "../../icons/trash-can-regular.svg";
import styles from "./MeshList.module.css";

interface MeshListProps {
    meshesList: string[];
    deleteMesh: Function;
}

const MeshList: React.FC<MeshListProps> = (props) => {
    return (
        <div className={styles.meshListContainer}>
            {props.meshesList.map((meshId) => {
                return (
                    <div className={styles.meshRowContainer}>
                        <p>{meshId}</p>
                        <img
                            src={trashcan}
                            alt="delete-mesh-icon"
                            onClick={() => {
                                props.deleteMesh(meshId);
                            }}
                        ></img>
                    </div>
                );
            })}
        </div>
    );
};

export default MeshList;
