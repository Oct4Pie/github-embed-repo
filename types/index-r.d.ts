export default GitRepo;
declare function GitRepo({ user, repo, options }: {
    user: any;
    repo: any;
    options: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace GitRepo {
    namespace propTypes {
        let user: PropTypes.Validator<string>;
        let repo: PropTypes.Validator<string>;
        let options: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            showProfile: PropTypes.Requireable<boolean>;
            showStats: PropTypes.Requireable<boolean>;
            theme: PropTypes.Requireable<string>;
            statsToShow: PropTypes.Requireable<(string | null | undefined)[]>;
            component: PropTypes.Requireable<string>;
        }>>>;
    }
}
import PropTypes from 'prop-types';
