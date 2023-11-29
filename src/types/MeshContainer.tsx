import { Mesh } from "three";

export interface meshContainerInterface {
    id: string;
    mesh: React.ReactElement<Mesh>;
}