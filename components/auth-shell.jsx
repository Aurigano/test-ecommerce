import Link from 'next/link'

export default function AuthShell({ mode }) {
  const isLogin = mode === 'login'
  const isForgotPassword = mode === 'forgot-password'

  return (
    <div className="auth-page">
      <div className="auth-background" />
      <div className="auth-shell">
        <section className="auth-aside">
          <Link href="/" className="brand-block brand-link auth-brand">
            <span className="brand-mark">MA</span>
            <div>
              <p className="eyebrow">Marketplace</p>
              <h1>Market Atlas</h1>
            </div>
          </Link>

          <div className="auth-copy">
            <p className="eyebrow">Member access</p>
            <h2>
              {isForgotPassword
                ? 'Reset access and get back to your saved cart.'
                : isLogin
                  ? 'Welcome back to your shopping desk.'
                  : 'Create your Market Atlas account.'}
            </h2>
            <p>
              {isForgotPassword
                ? 'We will send a recovery link to your email so you can securely update your password and continue shopping.'
                : isLogin
                ? 'Track orders, save favorites, and move from product discovery to checkout without losing your cart.'
                : 'Save your wishlist, manage deliveries, and get back to your cart from any device in a few taps.'}
            </p>
          </div>

          <div className="auth-points">
            <article>
              <strong>Fast checkout</strong>
              <span>Keep shipping details and payment preferences ready.</span>
            </article>
            <article>
              <strong>Wishlist sync</strong>
              <span>Pick up saved products later across login sessions.</span>
            </article>
            <article>
              <strong>Order history</strong>
              <span>Review current orders, returns, and delivery progress.</span>
            </article>
          </div>
        </section>

        <section className="auth-panel">
          <div className="auth-panel-head">
            <p className="eyebrow">{isForgotPassword ? 'Recovery' : isLogin ? 'Login' : 'Register'}</p>
            <h2>
              {isForgotPassword
                ? 'Forgot your password?'
                : isLogin
                  ? 'Sign in to continue'
                  : 'Start shopping with an account'}
            </h2>
            <p>
              {isForgotPassword ? (
                <>
                  Remembered it?{' '}
                  <Link href="/login" className="auth-inline-link">
                    Back to login
                  </Link>
                </>
              ) : isLogin ? (
                <>
                  New here?{' '}
                  <Link href="/register" className="auth-inline-link">
                    Create an account
                  </Link>
                </>
              ) : (
                <>
                  Already registered?{' '}
                  <Link href="/login" className="auth-inline-link">
                    Login instead
                  </Link>
                </>
              )}
            </p>
          </div>

          <form className="auth-form">
            {!isLogin && !isForgotPassword ? (
              <div className="auth-field-grid">
                <label className="auth-field">
                  <span>First name</span>
                  <input type="text" placeholder="Arin" />
                </label>
                <label className="auth-field">
                  <span>Last name</span>
                  <input type="text" placeholder="Dutta" />
                </label>
              </div>
            ) : null}

            <label className="auth-field">
              <span>Email address</span>
              <input type="email" placeholder="name@example.com" />
            </label>

            {!isForgotPassword ? (
              <label className="auth-field">
                <span>Password</span>
                <input
                  type="password"
                  placeholder={isLogin ? 'Enter your password' : 'Create a strong password'}
                />
              </label>
            ) : null}

            {!isLogin && !isForgotPassword ? (
              <label className="auth-field">
                <span>Confirm password</span>
                <input type="password" placeholder="Repeat your password" />
              </label>
            ) : null}

            {isForgotPassword ? (
              <p className="auth-helper">
                Enter the email address associated with your account and we&apos;ll send you a password reset link.
              </p>
            ) : isLogin ? (
              <div className="auth-row">
                <label className="auth-check">
                  <input type="checkbox" />
                  <span>Keep me signed in</span>
                </label>
                <Link href="/forgot-password" className="auth-inline-link">
                  Forgot password?
                </Link>
              </div>
            ) : (
              <label className="auth-check">
                <input type="checkbox" />
                <span>I agree to the terms, privacy policy, and order notifications.</span>
              </label>
            )}

            <button type="submit" className="auth-submit">
              {isForgotPassword ? 'Send reset link' : isLogin ? 'Login to account' : 'Create account'}
            </button>
          </form>

          <div className="auth-footer">
            <span>
              {isForgotPassword
                ? 'Want to keep shopping while you recover access?'
                : isLogin
                  ? 'Prefer to browse first?'
                  : 'Want to look around before registering?'}
            </span>
            <Link href="/" className="secondary-link auth-secondary-link">
              Continue as guest
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
