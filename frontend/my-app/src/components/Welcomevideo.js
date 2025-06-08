import videoBg from '../assets/BgVideoOG.mp4';
import './styles/index.css';

export function Welcomevideo(){
    return (
        <div className="Welcomevideo d-flex justify-content-center align-items-center">
            <video src={videoBg} autoPlay loop muted/>
            <div className="content">
                <h1 className="text-center">ASSET MANAGEMENT</h1>
                <p>in-house company portal</p>
            </div>
        </div>
    );
}
