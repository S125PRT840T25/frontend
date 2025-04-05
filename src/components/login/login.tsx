
import { Footer } from '@components';
import './login.css';

export function Login(): any {
    return (
        <div className='login-container'>
            <LeftPanel />
            <RightPanel />
            <Footer />
        </div>
    );    
}

const LeftPanel = () => {
    return (
        <div className='left-panel'>
            <h2 className="header-text">Feedback Analyzer</h2>
            <div className="image-container">
                <img src='/assets/images/login1.png' alt="First Image" className="panel-image-large" />
                <img src="/assets/images/login2.png" alt="Second Image" className="panel-image-small" />
            </div>
        </div>
    );
}

const RightPanel = () => {
    return (
        <div className='right-panel'>
            <div className='mobile-header'>
                <h2 className="mobile-header-text">Feedback Analyzer</h2>
            </div>
            <div className="d-flex align-items-center justify-content-center">
                <form className="login-form">
                    <h2 className="mb-4 text-center login-header">Login</h2>
                    <div className='form-controls-container'>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" required />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Sign In</button>
                    </div>                
                </form>
            </div>
        </div>
    );
}

